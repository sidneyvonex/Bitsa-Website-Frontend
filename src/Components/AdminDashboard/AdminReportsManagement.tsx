import { useMemo, useState } from 'react';
import {
    AlertCircle,
    CheckCircle2,
    CloudUpload,
    Download,
    FileText,
    Filter,
    Link2,
    Loader2,
    RefreshCw,
    Search,
    ShieldCheck,
    Tag,
    Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import {
    type Report,
    useCreateReportMutation,
    useDeleteReportMutation,
    useGetAllReportsQuery,
    useGetReportStatsQuery,
    useUpdateReportMutation,
} from '../../features/api/reportsApi';

const formatDate = (value?: string) => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const MAX_FILE_SIZE = 15 * 1024 * 1024;

export const AdminReportsManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showUploadDrawer, setShowUploadDrawer] = useState(false);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        category: '',
        fileUrl: '',
        fileType: 'application/pdf',
        isPublished: true,
    });

    const {
        data: reportsResponse,
        isLoading: isLoadingReports,
        isFetching: isFetchingReports,
        refetch: refetchReports,
    } = useGetAllReportsQuery();
    const { data: statsResponse, refetch: refetchStats } = useGetReportStatsQuery();

    const [createReport, { isLoading: isCreating }] = useCreateReportMutation();
    const [updateReport] = useUpdateReportMutation();
    const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

    const reports = useMemo<Report[]>(() => {
        const payload = reportsResponse?.data;
        return Array.isArray(payload) ? payload : [];
    }, [reportsResponse]);

    const categories = useMemo(() => {
        const unique = new Set<string>();
        reports.forEach((report) => {
            if (report.category) unique.add(report.category);
        });
        return Array.from(unique).sort((a, b) => a.localeCompare(b));
    }, [reports]);

    const filteredReports = useMemo(() => {
        return reports.filter((report) => {
            const matchesSearch =
                report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                `${report.creator?.firstName ?? ''} ${report.creator?.lastName ?? ''}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesCategory =
                categoryFilter === 'all' || !categoryFilter || report.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    }, [reports, searchTerm, categoryFilter]);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const canUploadFiles = Boolean(cloudName && uploadPreset);

    const resetForm = () => {
        setFormState({
            title: '',
            description: '',
            category: '',
            fileUrl: '',
            fileType: 'application/pdf',
            isPublished: true,
        });
    };

    const handleFileUpload = async (file: File) => {
        if (file.size > MAX_FILE_SIZE) {
            toast.error('File too large (max 15MB).');
            return;
        }

        if (!canUploadFiles) {
            toast.error('Cloudinary not configured', {
                description: 'Set VITE_CLOUDINARY_* env vars or paste a hosted file URL instead.',
            });
            return;
        }

        setIsUploadingFile(true);
        try {
            const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
            const payload = new FormData();
            payload.append('file', file);
            payload.append('upload_preset', uploadPreset as string);
            payload.append('folder', 'bitsa/reports');

            const response = await fetch(endpoint, {
                method: 'POST',
                body: payload,
            });
            const data = await response.json();

            if (!response.ok || !data.secure_url) {
                throw new Error(data.error?.message || 'Upload failed');
            }

            setFormState((prev) => ({
                ...prev,
                fileUrl: data.secure_url,
                fileType: file.type || prev.fileType,
            }));
            toast.success('File uploaded successfully');
        } catch (error) {
            console.error(error);
            toast.error('Unable to upload file');
        } finally {
            setIsUploadingFile(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formState.title.trim() || !formState.description.trim()) {
            toast.error('A title and description are required.');
            return;
        }

        if (!formState.category.trim()) {
            toast.error('Select or enter a category.');
            return;
        }

        if (!formState.fileUrl.trim()) {
            toast.error('Attach a document or paste a secure file URL.');
            return;
        }

        try {
            await createReport({
                title: formState.title.trim(),
                description: formState.description.trim(),
                category: formState.category.trim(),
                fileUrl: formState.fileUrl.trim(),
                fileType: formState.fileType,
                isPublished: formState.isPublished,
            }).unwrap();

            toast.success('Report uploaded');
            resetForm();
            setShowUploadDrawer(false);
            refetchReports();
            refetchStats();
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload report');
        }
    };

    const handleTogglePublish = async (report: Report) => {
        try {
            await updateReport({
                id: report._id,
                data: { isPublished: !report.isPublished },
            }).unwrap();
            toast.success('Report updated');
            refetchReports();
        } catch (error) {
            console.error(error);
            toast.error('Unable to update publish status');
        }
    };

    const handleDeleteReport = async (report: Report) => {
        if (!confirm(`Delete "${report.title}"? This action cannot be undone.`)) return;

        try {
            await deleteReport(report._id).unwrap();
            toast.success('Report deleted');
            refetchReports();
            refetchStats();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete report');
        }
    };

    const stats = statsResponse?.data;
    const statCards = [
        {
            label: 'Total Reports',
            value: stats?.totalReports ?? 0,
            accent: 'from-sky-500/15 to-sky-500/5 text-sky-900',
            iconColor: 'text-sky-600 bg-sky-100',
        },
        {
            label: 'Published Reports',
            value: stats?.publishedReports ?? 0,
            accent: 'from-emerald-500/15 to-emerald-500/5 text-emerald-900',
            iconColor: 'text-emerald-600 bg-emerald-100',
        },
        {
            label: 'Total Downloads',
            value: stats?.totalDownloads ?? 0,
            accent: 'from-indigo-500/15 to-indigo-500/5 text-indigo-900',
            iconColor: 'text-indigo-600 bg-indigo-100',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                    <h1 className="text-3xl font-bold text-slate-900">Reports & Compliance</h1>
                    <p className="text-slate-500">
                        Track submissions, generate exports, and keep the board informed using real API data.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            refetchReports();
                            refetchStats();
                        }}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                        disabled={isFetchingReports}
                    >
                        {isFetchingReports ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                        Refresh
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowUploadDrawer(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                        <CloudUpload className="h-4 w-4" />
                        Upload Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className={`rounded-2xl border border-slate-100 bg-gradient-to-br ${card.accent} p-6`}
                    >
                        <div className={`mb-4 inline-flex rounded-xl ${card.iconColor} p-3`}>
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-slate-500">{card.label}</p>
                        <p className="mt-1 text-3xl font-bold text-slate-900">{card.value.toLocaleString()}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 focus-within:border-blue-400">
                        <Search className="h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search title, description, or author..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Filter className="pointer-events-none absolute inset-y-0 left-3 my-auto h-4 w-4 text-slate-400" />
                            <select
                                value={categoryFilter}
                                onChange={(event) => setCategoryFilter(event.target.value)}
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400"
                            >
                                <option value="all">All categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                toast.message('API reference', {
                                    description: 'Docs: https://bitsabackendapi.azurewebsites.net/api-docs/#/',
                                })
                            }
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                        >
                            <FileText className="h-4 w-4" />
                            API Docs
                        </button>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold text-slate-500">Report</th>
                                <th className="px-6 py-4 text-left font-semibold text-slate-500">Category</th>
                                <th className="px-6 py-4 text-left font-semibold text-slate-500">Status</th>
                                <th className="px-6 py-4 text-left font-semibold text-slate-500">Downloads</th>
                                <th className="px-6 py-4 text-left font-semibold text-slate-500">Created</th>
                                <th className="px-6 py-4 text-right font-semibold text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoadingReports ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8">
                                        <div className="flex items-center justify-center gap-3 text-slate-500">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Fetching reports...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredReports.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16">
                                        <div className="flex flex-col items-center justify-center gap-3 text-center text-slate-500">
                                            <AlertCircle className="h-8 w-8 text-slate-400" />
                                            <p className="font-semibold text-slate-700">No reports match your filters.</p>
                                            <p className="text-sm">
                                                Adjust the search query or try another category.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredReports.map((report) => (
                                    <tr key={report._id} className="hover:bg-slate-50/70">
                                        <td className="px-6 py-4">
                                            <div className="max-w-sm">
                                                <p className="font-semibold text-slate-900">{report.title}</p>
                                                <p className="text-xs text-slate-500">
                                                    {report.creator
                                                        ? `${report.creator.firstName} ${report.creator.lastName}`
                                                        : 'Unknown author'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                                <Tag className="h-3 w-3" />
                                                {report.category || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                onClick={() => handleTogglePublish(report)}
                                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
                                                    report.isPublished
                                                        ? 'bg-emerald-50 text-emerald-700'
                                                        : 'bg-amber-50 text-amber-700'
                                                }`}
                                            >
                                                {report.isPublished ? (
                                                    <>
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        Published
                                                    </>
                                                ) : (
                                                    <>
                                                        <AlertCircle className="h-3.5 w-3.5" />
                                                        Draft
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                                            {report.downloads?.toLocaleString() ?? '0'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {formatDate(report.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={report.fileUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                                                >
                                                    <Download className="h-3.5 w-3.5" />
                                                    View
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteReport(report)}
                                                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50"
                                                    disabled={isDeleting}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showUploadDrawer && (
                <div className="fixed inset-0 z-40 flex">
                    <div
                        className="flex-1 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => {
                            setShowUploadDrawer(false);
                            resetForm();
                        }}
                    />
                    <div className="h-full w-full max-w-xl overflow-y-auto bg-white p-8 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                    New Report
                                </p>
                                <h2 className="text-2xl font-bold text-slate-900">Upload documentation</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowUploadDrawer(false);
                                    resetForm();
                                }}
                                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-sm font-medium text-slate-700">Title</label>
                                <input
                                    type="text"
                                    value={formState.title}
                                    onChange={(event) => setFormState({ ...formState, title: event.target.value })}
                                    placeholder="e.g., Q1 Program Impact Report"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea
                                    value={formState.description}
                                    onChange={(event) =>
                                        setFormState({ ...formState, description: event.target.value })
                                    }
                                    rows={4}
                                    placeholder="Brief summary that will help admins identify this file."
                                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Category</label>
                                    <input
                                        type="text"
                                        value={formState.category}
                                        onChange={(event) =>
                                            setFormState({ ...formState, category: event.target.value })
                                        }
                                        placeholder="Finance, Events, Compliance..."
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                        list="report-categories"
                                    />
                                    <datalist id="report-categories">
                                        {categories.map((category) => (
                                            <option key={category} value={category} />
                                        ))}
                                    </datalist>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">File Type</label>
                                    <select
                                        value={formState.fileType}
                                        onChange={(event) =>
                                            setFormState({ ...formState, fileType: event.target.value })
                                        }
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    >
                                        <option value="application/pdf">PDF</option>
                                        <option value="application/vnd.ms-excel">Excel</option>
                                        <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                            Excel (xlsx)
                                        </option>
                                        <option value="application/vnd.openxmlformats-officedocument.presentationml.presentation">
                                            Presentation
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4">
                                <p className="text-sm font-semibold text-slate-700">Attach document</p>
                                <p className="text-xs text-slate-500">
                                    {canUploadFiles
                                        ? 'Upload up to 15MB. PDF is recommended for final copies.'
                                        : 'Paste a hosted file URL below; Cloudinary credentials are not configured yet.'}
                                </p>
                                <label className="inline-flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-600">
                                    <CloudUpload className="h-5 w-5" />
                                    <span>{isUploadingFile ? 'Uploading...' : 'Select file to upload'}</span>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                                        className="hidden"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (file) {
                                                handleFileUpload(file);
                                            }
                                        }}
                                        disabled={isUploadingFile}
                                    />
                                </label>
                                <div>
                                    <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        OR paste file URL
                                    </label>
                                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                                        <Link2 className="h-4 w-4 text-slate-400" />
                                        <input
                                            type="url"
                                            value={formState.fileUrl}
                                            onChange={(event) =>
                                                setFormState({ ...formState, fileUrl: event.target.value })
                                            }
                                            placeholder="https://files.bitsa.org/report.pdf"
                                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                                <input
                                    type="checkbox"
                                    checked={formState.isPublished}
                                    onChange={(event) =>
                                        setFormState({ ...formState, isPublished: event.target.checked })
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
                                />
                                Make report visible to other admins immediately
                            </label>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                        setShowUploadDrawer(false);
                                    }}
                                    className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isCreating ? 'Saving...' : 'Save Report'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReportsManagement;


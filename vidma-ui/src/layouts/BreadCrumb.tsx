import "../common/main.css"

interface BreadCrumbProps {
    title: string;
}

export default function BreadCrumb({ title }: BreadCrumbProps) {
    return (
        <div className="breadcrumb">
            <h1>{title}</h1>
        </div>
    )
}
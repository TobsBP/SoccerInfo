import type React from 'react';

interface SubmitButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	label: string;
	loadingLabel?: string;
}

export function SubmitButton({
	isLoading = false,
	label,
	loadingLabel = 'Saving...',
	className = '',
	...props
}: SubmitButtonProps) {
	return (
		<button
			type="submit"
			disabled={isLoading || props.disabled}
			className={`group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-zinc-800 to-zinc-900 px-6 py-3 font-semibold text-zinc-100 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(100,100,100,0.3)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
			{...props}
		>
			<div className="absolute inset-0 bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
			<span className="relative z-10">{isLoading ? loadingLabel : label}</span>
		</button>
	);
}

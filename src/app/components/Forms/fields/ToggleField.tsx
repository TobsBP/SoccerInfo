import type React from 'react';

interface ToggleFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
}

export function ToggleField({ label, id, ...props }: ToggleFieldProps) {
	return (
		<div className="flex items-center justify-between rounded-xl border border-zinc-800/50 bg-black/50 p-4 backdrop-blur-xl">
			<label htmlFor={id} className="text-sm font-medium text-zinc-300">
				{label}
			</label>
			<label className="relative inline-flex cursor-pointer items-center">
				<input id={id} type="checkbox" className="peer sr-only" {...props} />
				<div className="peer h-7 w-14 rounded-full bg-zinc-800 border border-zinc-700 after:absolute after:start-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-zinc-500 after:transition-all after:content-[''] peer-checked:bg-zinc-200/20 peer-checked:after:translate-x-7 peer-checked:after:bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/30 peer-checked:border-white/40"></div>
			</label>
		</div>
	);
}

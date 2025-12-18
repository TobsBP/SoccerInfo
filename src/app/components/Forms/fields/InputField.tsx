import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { type InputHTMLAttributes, useRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
}

export function InputField({
	label,
	id,
	className = '',
	type,
	...props
}: InputFieldProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleStep = (direction: 'up' | 'down') => {
		const input = inputRef.current;
		if (!input) return;

		if (direction === 'up') input.stepUp();
		else input.stepDown();

		const setter = Object.getOwnPropertyDescriptor(
			window.HTMLInputElement.prototype,
			'value',
		)?.set;
		setter?.call(input, input.value);
		input.dispatchEvent(new Event('input', { bubbles: true }));
	};

	const isDateType =
		type === 'date' || type === 'datetime-local' || type === 'time';

	return (
		<div className="space-y-2">
			<label htmlFor={id} className="block text-sm font-medium text-zinc-300">
				{label}
			</label>
			<div className="relative group">
				<input
					ref={inputRef}
					id={id}
					type={type}
					className={`w-full rounded-xl border border-zinc-800/50 bg-black/50 px-4 py-3 text-zinc-100 backdrop-blur-xl transition-all duration-300 focus:border-zinc-500/50 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${
						type === 'number'
							? 'pr-10 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
							: ''
					} ${
						isDateType
							? 'pr-10 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6'
							: ''
					} ${className}`}
					{...props}
				/>
				{type === 'number' && (
					<div className="absolute right-0 top-0 flex h-full flex-col border-l border-zinc-800/50">
						<button
							type="button"
							onClick={() => handleStep('up')}
							className="flex h-1/2 items-center justify-center px-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-zinc-100 rounded-tr-xl focus:outline-none focus:bg-zinc-800/50"
							tabIndex={-1}
						>
							<ChevronUp className="h-3 w-3" />
						</button>
						<button
							type="button"
							onClick={() => handleStep('down')}
							className="flex h-1/2 items-center justify-center px-2 text-zinc-400 transition-colors border-t border-zinc-800/50 hover:bg-zinc-800/50 hover:text-zinc-100 rounded-br-xl focus:outline-none focus:bg-zinc-800/50"
							tabIndex={-1}
						>
							<ChevronDown className="h-3 w-3" />
						</button>
					</div>
				)}
				{isDateType && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-hover:text-zinc-200 transition-colors">
						<Calendar className="h-5 w-5" />
					</div>
				)}
			</div>
		</div>
	);
}

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const inputVariants = cva("", {
	variants: {
		size: {
			default: "",
			sm: "",
			lg: "",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

export type InputBaseProps = React.InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof inputVariants> & {
		prefixNode?: React.ReactNode;
		postfixNode?: React.ReactNode;
	};

const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
	({ className, type, prefixNode, postfixNode, size, ...props }, ref) => (
		// eslint-disable-next-line jsx-a11y/label-has-associated-control
		<label
			className={cn(
				`
			p-3.5 flex content-center rounded-md gap-4
			border-[1px] border-solid border-gray3
			bg-gray4
		`,
				className,
			)}
		>
			{prefixNode && <div className="w-[15px] h-[15px]">{prefixNode}</div>}
			<input
				inputMode="numeric"
				pattern="[0-9]*"
				// type={type}
				className="bg-transparent text-[13px] flex-auto focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				ref={ref}
				{...props}
			/>
			{postfixNode && (
				<div className="text-[14px] text-[#8f8f8f] font-bold">
					{postfixNode}
				</div>
			)}
		</label>
	),
);

InputBase.displayName = "InputBase";

export { InputBase };

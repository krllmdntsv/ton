"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const RangeValues = (min: number, max: number): number[] => {
	// 	Array(max).fill(0).map((_, i) => i)
	const resArr = [];
	for (let i = min; i <= max; i++) {
		resArr.push(i);
	}

	return resArr;
};

const LabelValue = React.forwardRef<
	HTMLDivElement,
	{
		value: number;
		className?: string;
		prefix?: React.ReactNode | string;
		postfix?: React.ReactNode | string;
	}
>(({ value, className, prefix, postfix }, ref) => (
	<div
		ref={ref}
		className={cn(
			"bg-primary rounded-sm p-1 font-[600] text-[12px] text-primary-foreground min-w-[23px] flex items-center justify-center",
			className,
		)}
	>
		<span>
			{prefix}
			{value}
			{postfix}
		</span>
	</div>
));

type ThumbOptions = {
	postfix?: React.ReactNode | string;
	prefix?: React.ReactNode | string;
};

const CustomThumb = React.forwardRef<
	React.Ref<HTMLDivElement>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> & {
		value: number;
		options?: ThumbOptions;
	}
>(({ className, value, options, ...props }, ref) => {
	const [isHovered, setIsHovered] = React.useState(false);

	const onStart = () => {
		setIsHovered(true);
	};
	const onEnd = () => {
		setIsHovered(false);
	};

	return (
		<div
			ref={ref}
			className={cn(
				"block h-7 w-7 rounded-full border-2 border-[#c1c9d2] border-solid bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
				className,
			)}
			onMouseEnter={onStart}
			onMouseLeave={onEnd}
			onTouchStart={onStart}
			onTouchEnd={onEnd}
			{...props}
		>
			{isHovered && (
				<LabelValue
					value={value}
					className="absolute top-0 -translate-y-8 left-1/2 -translate-x-1/2"
					{...options}
				/>
			)}
		</div>
	);
});

CustomThumb.displayName = "CustomThumb";

LabelValue.displayName = "LabelValue";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
		postfixString?: React.ReactNode | string;
		prefixString?: React.ReactNode | string;
		thumbOptions?: ThumbOptions;
		sliderOptions?: {
			// hoverThumb
			displayStepsValues?: boolean;
		};
	}
>(({ className, thumbOptions, sliderOptions, ...props }, ref) => {
	const [value, setValue] = React.useState(0);

	const onVolumeChange = (newValue: number[]): void => {
		setValue(newValue[0]);
	};

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex w-full touch-none select-none items-center pb-8 pt-2",
				className,
			)}
			onValueChange={(v) => onVolumeChange(v as any)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
				<SliderPrimitive.Range className="absolute h-full bg-primary" />
			</SliderPrimitive.Track>
			{sliderOptions?.displayStepsValues &&
				props.max &&
				props.step &&
				props.min && (
					<div className="absolute bottom-0 translate-y-[5px] w-full flex items-center justify-between z-10 text-sm">
						{RangeValues(props.min, props.max).map((i) => (
							<span key={i} className="block h-7 w-7 text-center">
								{i}
							</span>
						))}
					</div>
				)}

			<SliderPrimitive.Thumb asChild>
				<CustomThumb value={value} options={thumbOptions} />
			</SliderPrimitive.Thumb>
		</SliderPrimitive.Root>
	);
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

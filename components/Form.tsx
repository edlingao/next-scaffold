"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export function Form({
	children,
	action,
  className = "",
}: {
	children: React.ReactNode;
	action: (_: any, formData: FormData) => Promise<any>;
  className?: string;
}) {
	const [state, formAction] = useFormState(action, {
		error: null
	});

  const router = useRouter();

  useEffect(() => {
    if (state.redirect) {
      router.push(state.redirect);
    }
  }, [state.redirect]);

	return (
		<form className={ "flex flex-col w-1/2 mx-auto " + className} action={formAction}>
			{children}
		</form>
	);
}

export interface ActionResult {
	error: string | null;
}

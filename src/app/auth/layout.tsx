import { Card, CardContent } from '@/components/ui/card';
import { OauthButtons } from '@/features/auth/components/oauth-buttons';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: AuthLayoutProps) {
	return (
		<div className="w-full max-w-2xl mx-auto my-auto px-4 py-6">
			<Card className="flex flex-col max-w-md w-full ">
				<CardContent>
					{children}
					<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-4">
						<span className="bg-background text-muted-foreground relative z-10 px-2">O continúa con</span>
					</div>
					<OauthButtons />
				</CardContent>
			</Card>
		</div>
	);
}

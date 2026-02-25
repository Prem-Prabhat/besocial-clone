export default function ProfilePage() {
    return (
        <div className="flex-1 max-w-2xl mx-auto py-6 px-5 space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Profile</h1>
                    <p className="text-sm text-muted-foreground">Manage your account and posts</p>
                </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                Profile settings will appear here.
            </div>
        </div>
    );
}

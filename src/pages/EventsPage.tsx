export default function EventsPage() {
    return (
        <div className="flex-1 max-w-2xl mx-auto py-6 px-5 space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Events</h1>
                    <p className="text-sm text-muted-foreground">Upcoming webinars and meetups</p>
                </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                No upcoming events at the moment.
            </div>
        </div>
    );
}

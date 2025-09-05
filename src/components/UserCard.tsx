type TgUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

export default function UserCard({ user }: { user: TgUser | null }) {
  if (!user) return <p>No user loaded.</p>;

  return (
    <div className="p-4 bg-primary border-muted text-foreground rounded-xl">
      <img
        src={user.photo_url}
        alt="avatar"
        className="h-16 w-16 rounded-full mb-2"
      />
      <p className="font-bold">
        {user.first_name} {user.last_name}
      </p>
      <p>@{user.username}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

type Member = {
    id: number;
    name: string;
    email: string;
    joined: string;
};

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetch('/api/admin/members')
            .then((res) => res.json())
            .then(setMembers)
            .catch(console.error);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Members</h1>
            <table className="min-w-full bg-[#111] text-white">
                <thead>
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((m) => (
                        <tr key={m.id} className="border-t border-white/10">
                            <td className="p-2">{m.id}</td>
                            <td className="p-2">{m.name}</td>
                            <td className="p-2">{m.email}</td>
                            <td className="p-2">{m.joined}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

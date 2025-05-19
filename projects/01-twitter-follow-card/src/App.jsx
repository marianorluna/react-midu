import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
        userName: 'arqfi',
        name: 'ARQFI Dev',
        initialIsFollowing: true,
    },
    {
        userName: 'leomessi',
        name: 'Lionel Messi',
        initialIsFollowing: false,
    },
    {
        userName: 'pepsi',
        name: 'Pepsi Max',
        initialIsFollowing: false,
    },
    {
        userName: 'riverplate',
        name: 'River Plate',
        initialIsFollowing: true,
    },
]

export function App() {
    const formatUser = (userName) => `@${userName}`
    return (
        <section className='App'>
            {users.map(({ userName, name, initialIsFollowing }) => (
                <TwitterFollowCard
                    key={userName}
                    formatUserName={formatUser}
                    userName={userName}
                    name={name}
                    initialIsFollowing={initialIsFollowing}
                />
            ))}
        </section>
    )
}
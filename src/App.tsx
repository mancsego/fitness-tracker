import ExerciseList from '@/components/ExerciseList'
import GroupList from '@/components/GroupList'
import IconSet from '@/components/IconSet'

export default function App() {
  return (
    <>
      <IconSet />
      <header className="flex justify-center">Header</header>
      <main className="bg-slate-50 py-5">
        <ExerciseList />
        <GroupList />
      </main>
      <footer className="flex justify-center">Footer</footer>
    </>
  )
}

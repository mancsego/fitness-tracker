import ExerciseList from './components/ExerciseList'
import GroupList from './components/GroupList'

export default function App() {
  return (
    <>
      <header className="flex justify-center">Header</header>
      <main className="bg-slate-50 py-5">
        <ExerciseList />
        <GroupList />
      </main>
      <footer className="flex justify-center">Footer</footer>
    </>
  )
}

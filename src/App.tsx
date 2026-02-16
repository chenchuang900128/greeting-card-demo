import GreetingCard from './GreetingCard';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <GreetingCard message="除夕快乐！" />
    </div>
  );
}

'use client';
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const [output, setOutput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const generateText = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ output }),
      });

      const data = await response.json();
      if (response.ok) {
        setAnswer(data.output);
      } else {
        setAnswer("Error generating text. Try again.");
      }
    } catch (error) {
      console.log(error);
      setAnswer("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  if (status === "loading") {
    return <div className="text-center text-white mt-10">Loading session...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl">Please log in to use the app</h2>
          <button
            onClick={() => signIn()}
            className="px-6 py-3 bg-yellow-500 rounded-md text-black font-semibold hover:bg-yellow-400"
          >
            Sign in with OAuth
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black via-gray-800 to-blue-800"></div>

      <div className="flex items-center justify-center min-h-screen px-5">
        <main className="flex flex-col gap-6 w-full max-w-lg p-8 bg-black rounded-lg shadow-xl border-2 border-yellow-500">
          <div className="text-right text-yellow-400 text-sm">
            Logged in as <strong>{session.user?.email}</strong>
            <button
              onClick={() => signOut()}
              className="ml-3 text-red-400 underline"
            >
              Sign out
            </button>
          </div>

          <input
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Enter your prompt here"
            className="w-full p-4 text-lg text-yellow-400 bg-black border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          />

          <button
            className={`w-full p-3 text-lg font-medium text-black bg-yellow-500 rounded-lg shadow hover:bg-yellow-400 active:scale-95 transition-transform duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={!loading ? generateText : null}
            disabled={loading}
          >
            {loading ? "Generating..." : "Submit"}
          </button>

          <div className="p-4 bg-gray-800 border border-yellow-500 rounded-lg shadow">
            <strong className="block mb-2 text-yellow-400">Response:</strong>
            <p className="text-white">{answer || "Your response will appear here."}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

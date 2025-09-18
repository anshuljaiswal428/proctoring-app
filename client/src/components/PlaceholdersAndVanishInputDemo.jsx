"use client";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";


export default function PlaceholdersAndVanishInputDemo({username, setUsername, setSubmitted}) {
  const placeholders = [
    "What's your name?",
    "Tell me your name?",
    "Your name is?"
  ];

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setSubmitted(true);
    }
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2
        className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          What should we call you?
      </h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>
  );
}

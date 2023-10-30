import { useState } from "react";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [is_married, setIs_married] = useState(false);
  return (
    <>
      <form onSubmit>
        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.name)}
        />
        <input
          type="text"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.email)}
        />
        <input
          type="text"
          placeholder="enter gender"
          value={gender}
          onChange={(e) => setGender(e.target.gender)}
        />
        <input
          type="text"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.password)}
        />
        <input
          type="text"
          placeholder="enter age"
          value={age}
          onChange={(e) => setAge(e.target.age)}
        />
        <input
          type="text"
          placeholder="enter city"
          value={city}
          onChange={(e) => setCity(e.target.city)}
        />
        <input
          type="text"
          placeholder="enter married"
          value={is_married}
          onChange={(e) => setName(e.target.is_married)}
        />
      </form>
    </>
  );
}

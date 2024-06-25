import { useState } from "react"
import './AddingCandidate.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProfileChange from "./ProfileChange";

export default function HomePage() {
    return (
        <div>
            <BrowserRouter>
                <nav id="nav">
                    <button type="button"><Link to="/Entrance">כניסה</Link> </button>
                    <button type="button" > <Link to="/Register">הרשמה</Link></button>
                    <button type="button" > <Link to="/ProfileChange">שינוי פרופיל </Link> </button>
                </nav>
                <Routes>
                {/* <Route path="/Entrance" element={<Entrance></Entrance>} />
                <Route path="/Register" element={<Register></Register>} /> */}
                <Route path="/ProfileChange" element={<ProfileChange></ProfileChange>} />

                </Routes>
            </BrowserRouter>
            <div>אודות...</div>
            <button type="button" >העלאת קורות חיים</button>
            <futer>צור קשר...
                <span id='name'>חנה ברגמן</span>
                <span id='tel'>טל: 055-5555-555</span>
                <span id='email'>מייל: kkk@kkk.dd</span>
            </futer>
        </div>
    )
    // const [name,setName]=useState('');
    // const [email,setEmail]=useState('');
    // const [phone,setPhone]=useState('');
    // const [resume, setResume] = useState(null);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('email', email);
    //     formData.append('phone', phone);
    //     formData.append('resume', resume);

    //     try {
    //         const response = await fetch('/api/apply', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             alert('Application submitted successfully!');
    //         } else {
    //             alert('Failed to submit application.');
    //         }
    //     } catch (error) {
    //         alert('Error: ' + error.message);
    //     }
    // };

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <div>
    //             <label>
    //                 Name:
    //                 <input
    //                     type="text"
    //                     value={name}
    //                     onChange={(e) => setName(e.target.value)}
    //                     required
    //                 />
    //             </label>
    //         </div>
    //         <div>
    //             <label>
    //                 Email:
    //                 <input
    //                     type="email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     required
    //                 />
    //             </label>
    //         </div>
    //         <div>
    //             <label>
    //                 Resume:
    //                 <input
    //                     type="file"
    //                     onChange={(e) => setResume(e.target.files[0])}
    //                     required
    //                 />
    //             </label>
    //         </div>
    //         <button type="submit">Submit</button>
    //     </form>
    // );
}
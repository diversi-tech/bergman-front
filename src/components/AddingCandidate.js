import  { useState } from "react"

export default function AddingCandidate(candidate){

    
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
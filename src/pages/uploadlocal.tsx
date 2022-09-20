import type { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { useState } from 'react'

const UploadLocalPage: NextPage = () => {
  const [file, setFile] = useState();

  const handleChange = (f: File) => {
    setFile(f);
  }

  const handleSubmit = async () => {
    const formData = new FormData();
  
    const res = await fetch("http://localhost:3000/api/getFiles", {
      mode: "no-cors",
      method: 'GET',
    });

    const text = await res.text();

    const blob = new Blob([text], { type: 'text/html' });
    console.log(await blob.text());

    const file = new File([blob], "joeshmoe.html");

    formData.append('files', file);

    const res2 = await fetch("http://10.171.204.213/fileupload.php", {
      mode: "no-cors",
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: formData,
    }); 
  }

  return (
    <>
      <div>
        <Navbar 
          page="about"
        />
        <div className="px-20 text-justify">
          <input type="file" multiple onChange={(e) => handleChange(e.target.files[0])}/>
          <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
    </>
  )
}

export default UploadLocalPage

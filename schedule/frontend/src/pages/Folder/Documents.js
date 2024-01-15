import './Folder.css';

// Icons
import { 
  BsFilePdf, 
  BsFileWord, 
  BsImage, 
  BsPencilFill,
  BsDownload,
  BsXLg,
} from 'react-icons/bs';

// hooks
import { useQuery } from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { 
  deleteArchive, 
  searchArchives, 
  resetMessage,
  updateArchive, 
} from "../../slices/archiveSlice";

const Documents = () => {
  const query = useQuery();
  const search = query.get("q");
  const dispatch = useDispatch();
  const { archives, loading } = useSelector((state) => state.archive);
  const { user: userAuth } = useSelector((state) => state.auth);
  const [ editId, setEditId ] = useState();
  const [ editTitle, setEditTitle ] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useSelector((state) => {
    console.log(state)
  })

  // Load all archives
  useEffect(() => {
    dispatch(searchArchives(search));
  }, [dispatch, search]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  // Reset component message
  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const GetIconArchive = (image) => {
    let icons = "";
    const extension = image.split(".")[1];

    if (extension === "pdf") {
      icons = <span className="archive-icons"> <BsFilePdf size={100} /> </span>
    } else if (extension === "docx") {
      icons = <span className="archive-icons"> <BsFileWord size={100} /> </span>
    } else {
      icons = <span className="archive-icons"> <BsImage size={100} /> </span>
    }
    return icons;
  }

  // Update photo title
  const handleUpdate = (e) => {
    e.preventDefault();

    const archiveData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updateArchive(archiveData));

    setIsEditing(false);
    resetComponentMessage();
  };

  const handleEdit = (archive) => {
    setEditId(archive._id);
    setEditTitle(archive.title);
    setIsEditing(true);
  };

  // Exclude an image
  const handleDelete = (id) => {
    dispatch(deleteArchive(id));

    resetComponentMessage();
  };

  const handleDownload = async(archive) => {
    const downloadUrl = `./../../../backend/uploads/archives/${archive.image}`;
    
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = archive.title+"."+archive.image.split(".")[1];

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);

    window.URL.revokeObjectURL(blobUrl);
  }

  const renderEditElement = (archive) => {
    return (
      <div className="edit-container">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <span className="archive-icons">{GetIconArchive(archive.image)}</span>
        <div className="actions">
          <button onClick={handleUpdate}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      </div>
    );
  };

 return (
    <div id='documents'>
      <div className="title-container">
        <h1>Documentos</h1>
      </div>
      <div className="archives-container">
        {archives && archives.map((archive, index) => (
          archive.userId === userAuth._id && (
            <div key={index} className="archive-item">
              {isEditing && editId === archive._id ? (
                renderEditElement(archive)
              ) : (
                <>
                  <p>{archive.title}</p>
                  <span className="archive-icons">{GetIconArchive(archive.image)}</span>
                  <div className="actions">
                    <BsDownload onClick={() => handleDownload(archive)} />
                    <BsPencilFill onClick={() => handleEdit(archive)} />
                    <BsXLg onClick={() => handleDelete(archive._id)} />
                  </div>
                </>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  )
  
}

export default Documents
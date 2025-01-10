import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function YouTubeVideos(props) {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const playlist = searchParams.get("id"); // Get the value of 'playlistid' query
  const [selectedVideo, setSelectedVideo] = useState(null);
  const youtubeURL = `https://mahtabengineering.com/ytapi.php`;

  useEffect(() => {
    fetch(`${youtubeURL}?playlist_id=${playlist}`, {
      method: "GET", // or "POST" depending on your PHP setup
    })
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        const entries = xmlDoc.getElementsByTagName("entry");
        const videosArray = Array.from(entries).map((entry) => {
          const title = entry.getElementsByTagName("title")[0].textContent;
          const videoId =
            entry.getElementsByTagName("yt:videoId")[0].textContent;
          const thumbnail = entry
            .getElementsByTagName("media:thumbnail")[0]
            .getAttribute("url");
          const published =
            entry.getElementsByTagName("published")[0].textContent;

          return { title, videoId, thumbnail, published };
        });

        setVideos(videosArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="flex row h-screen bg-gradient-to-r from-purple-900 to-indigo-700 justify-center pt-10 h-[100%] pb-10">
      {!selectedVideo && (
        <div className="grid gap-6 grid-cols-3 p-10">
          {videos.map((video, index) => (
            <div
              key={index}
              className="video-title"
              onClick={() => handleVideoClick(video)}
            >
              <h4>{video.title}</h4>
              <img
                className="md:h-80 w-80 h-40"
                src={video.thumbnail}
                alt={video.title}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      )}
      {selectedVideo && (
        <div className="md:flex gap-5 video-player ">
          <div className=" mb-5">
            <div className="bg-slate-200 text-black md:w-[800px] h-[50px] text-center place-content-center">
              <h4>{selectedVideo.title}</h4>
            </div>
            <div className="bg-indigo-500 md:w-[800px] md:h-[400px] h-auto">
              <iframe
                className="md:h-[100%] h-[400px] w-[100%]"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-slate-200 text-black md:w-[800px] h-[50px] text-center place-content-center">
              <p>
                Published:{" "}
                {new Date(selectedVideo.published).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-start">
            <div className="grid gap-6 grid-cols-3">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className=" flex-wrap text-wrap"
                  onClick={() => handleVideoClick(video)}
                >
                  <h4>{video.title}</h4>
                  <img
                    className="md:h-60 h-20 md:w-60"
                    src={video.thumbnail}
                    alt={video.title}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router";
// export default function YouTubeVideos(props) {
//   // const params = useParams;
//   const [videos, setVideos] = useState([]);
//   const [searchParams] = useSearchParams();
//   const playlist = searchParams.get("id"); // Get the value of 'playlistid' query
//   useEffect(() => {
//     fetch(`/feeds/videos.xml?playlist_id=${playlist}`)
//       .then((response) => response.text())
//       .then((data) => {
//         // Parse the XML
//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(data, "text/xml");

//         // Extract video entries
//         const entries = xmlDoc.getElementsByTagName("entry");
//         const videosArray = Array.from(entries).map((entry) => {
//           const title = entry.getElementsByTagName("title")[0].textContent;
//           const videoId =
//             entry.getElementsByTagName("yt:videoId")[0].textContent;
//           const thumbnail = entry
//             .getElementsByTagName("media:thumbnail")[0]
//             .getAttribute("url");
//           const published =
//             entry.getElementsByTagName("published")[0].textContent;

//           return { title, videoId, thumbnail, published };
//         });

//         setVideos(videosArray);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <>
//       {videos.map((video, index) => (
//         <div
//           key={index}
//           className="flex row h-screen bg-gradient-to-r from-purple-900 to-indigo-700 justify-center pt-20"
//         >
//           <div>
//             <div className="bg-slate-200 text-black md:w-[800px] h-[50px] text-center place-content-center">
//               <h4>{video.title}</h4>
//             </div>
//             <div className="bg-indigo-500 md:w-[800px] md:h-[400px] h-[600px]">
//               <iframe
//                 className="h-40 w-40"
//                 src={`https://www.youtube.com/embed/${video.videoId}`}
//                 title={video.title}
//                 frameBorder="0"
//
//               ></iframe>
//             </div>
//             <div className="bg-slate-200 text-black md:w-[800px] h-[50px] text-center place-content-center">
//               <p>Published: {new Date(video.published).toLocaleDateString()}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

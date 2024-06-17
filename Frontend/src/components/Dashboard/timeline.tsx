import React from "react";

const milestones = [
  {
    id: 1,
    timestamp: "13-06-2024 02:27:06 PM",
    author: "Kunal Shetkar",
    message:
      "Target status not reflecting as per defined range\nxenon TCF\nName: Team yodha",
    image: "Capture.PNG",
  },
  {
    id: 2,
    timestamp: "13-06-2024 03:48:39 PM",
    author: "Anushree Shastrakar",
    message: "Please connect on MS Teams",
    image: null,
  },
];

const Milestone = ({
  timestamp,
  author,
  message,
  image,
  isRight,
}: {
  timestamp: any;
  author: any;
  message: any;
  image: any;
  isRight: any;
}) => (
  <div
    className={`flex ${isRight ? "flex-row-reverse" : ""} items-center w-full my-4`}
  >
    <div className="w-1/2 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-gray-500 mb-2">{timestamp}</h2>
        <h3 className="text-xl font-bold mb-2">{author}</h3>
        <p className="text-gray-700 whitespace-pre-line">{message}</p>
        {image && (
          <img
            src={image}
            alt="Attachment"
            className="mt-4 max-w-full h-auto"
          />
        )}
      </div>
    </div>
    <div className="w-12 h-12 bg-white border-4 border-orange-400 rounded-full flex items-center justify-center -mx-6">
      <span role="img" aria-label="clock">
        🕒
      </span>
    </div>
  </div>
);

const Timeline = () => (
  <div className="container mx-auto py-8">
    <div className="relative wrap overflow-hidden p-10 h-full">
      <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
      {milestones.map((milestone, index) => (
        <Milestone
          key={milestone.id}
          timestamp={milestone.timestamp}
          author={milestone.author}
          message={milestone.message}
          image={milestone.image}
          isRight={index % 2 !== 0}
        />
      ))}
    </div>
  </div>
);

export default Timeline;

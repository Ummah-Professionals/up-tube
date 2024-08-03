import fs from 'fs';

const generateRandomVideo = (id) => ({
  id: id.toString(),
  title: `Video ${id}`,
  description: `This is a description of Video ${id}.`,
  author: `Author ${id}`,
  views: `${Math.floor(Math.random() * 10000) + 100} views`,
  date: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(), // Random date within the last year
  thumbnail: `https://picsum.photos/seed/${id}/320/180`, // Random placeholder image
});

const generateVideos = (num) => {
  return Array.from({ length: num }, (_, index) => generateRandomVideo(index + 1));
};

const videos = generateVideos(100); // Generate 100 videos
fs.writeFileSync('./src/mockVideos.json', JSON.stringify(videos, null, 2));
console.log('Mock videos generated successfully!');

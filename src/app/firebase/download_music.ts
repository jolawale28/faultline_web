import {addDownloadClick} from "@/app/firebase/download_clicks";

function downloadMusicFromUrl(url: string, fileName: string = 'music.mp3') {

    addDownloadClick();
    try {
        // Create a temporary link element
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;  // Set the download attribute with the file name
        a.style.display = 'none';

        // Append to the document and click to trigger download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        console.log('Music download started:', fileName);
    } catch (error) {
        console.error('Error downloading music:', error);
    }
}

export default downloadMusicFromUrl;

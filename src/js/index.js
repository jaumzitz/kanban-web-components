taskIndex = 3

window.addEventListener('offline', (e) => {
    toggleOfflineHeader()
});

window.addEventListener('online', (e) =>{
    toggleOfflineHeader()
    console.log("You are now back online.");
});

const toggleOfflineHeader = () => {
    const header = document.getElementById('connection-status')

    header.style.display == 'none' ? header.style.display = 'block' : header.style.display = 'none'

    
    
}


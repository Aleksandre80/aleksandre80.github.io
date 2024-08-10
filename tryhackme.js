const rooms = [
    {
        id: 1,
        name: 'Mr Robot CTF',
        description: 'Based on the Mr. Robot show, can you root this box?',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/7a8797ae59733f2a72f0e8a8748be128.jpeg'
    },
    {
        id: 2,
        name: 'Wgel CTF',
        description: 'Can you exfiltrate the root flag?',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/8116d1d52d3a63dd1e7c2e7ddce8a0d5.png'
    },
    {
        id: 3,
        name: 'Blue',
        description: 'Deploy & hack into a Windows machine, leveraging common misconfigurations issues.',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/7717bbc69c486931e503a74f3192a4d8.gif'
    },
    {
        id: 4,
        name: 'Brooklyn Nine Nine',
        description: 'This room is aimed for beginner level hackers but anyone can try to hack this box. There are two main intended ways to root the box.',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/95b2fab20e29a6d22d6191a789dcbe1f.jpeg'
    },
    {
        id: 5,
        name: 'Bounty Hacker',
        description: 'You talked a big game about being the most elite hacker in the solar system. Prove it and claim your right to the status of Elite Bounty Hacker!',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/9ad38a2cc31d6ae0030c888aca7fe646.jpeg'
    },
    {
        id: 6,
        name: 'Brute It',
        description: 'Learn how to brute, hash cracking and escalate privileges in this box!',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/e343e8b253b4efc14bf61236d457c923.jpg'
    },
    {
        id: 7,
        name: 'Linux Fundamentals Part 2',
        description: 'Continue your learning Linux journey with part two. You will be learning how to log in to a Linux machine using SSH, how to advance your commands, file system interaction.',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/9aa4e0fe36ec8148b02bfbd6c0507736.png'
    },
    {
        id: 8,
        name: 'Intro to Offensive Security',
        description: 'Hack your first website (legally in a safe environment) and experience an ethical hacker\'s job.',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/f9dbbfc2dadce39c2ce9a592a0389d38.png'
    },
    {
        id: 9,
        name: 'OWASP Juice Shop',
        description: 'This room uses the Juice Shop vulnerable web application to learn how to identify and exploit common web application vulnerabilities.',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/9a0c0a661ba218c0f9d533c8f41d8dd5.png'
    },
    {
        id: 10,
        name: 'Crack the hash',
        description: 'Cracking hashes challenges.',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/fafc074a97207f99929f2ee28bea87ac.jpeg'
    },
    {
        id: 11,
        name: 'Intro to Containerisation',
        description: 'Learn about the technologies and benefits of containerisation.',
        image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/54c8b0434d00d19e6e5c301f4c7bad5f.png'
    }
    

];

const roomsContainer = document.getElementById('rooms-container');

rooms.forEach(room => {
    const roomCard = document.createElement('div');
    roomCard.classList.add('room-card');

    const roomImage = document.createElement('img');
    roomImage.src = room.image;
    roomImage.alt = room.name;

    const roomInfo = document.createElement('div');
    roomInfo.classList.add('room-info');

    const roomName = document.createElement('h4');
    roomName.textContent = room.name;

    const roomDescription = document.createElement('p');
    roomDescription.textContent = room.description;

    roomInfo.appendChild(roomName);
    roomInfo.appendChild(roomDescription);
    roomCard.appendChild(roomImage);
    roomCard.appendChild(roomInfo);
    roomsContainer.appendChild(roomCard);
});

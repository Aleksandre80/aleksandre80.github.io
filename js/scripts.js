document.addEventListener('DOMContentLoaded', function() {
  const projects = [
    { id: 1, name: 'CryptoAlertHub', description: 'Site de cryptomonnaies non hébergé', image: 'img/Crypto1.png' , url: 'CryptoAlertHub.html', play:'<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512" style="fill : #bbb"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/></svg>'},
    { id: 2, name: 'Site client', description: 'Site pour un artisan hébergé sur une instance EC2 AWS', image: 'img/SiteClient.png', url: `https://www.autour-de-latelier-du-bois.fr`, play:'<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512" style="fill : #bbb"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/></svg>' },
    { id: 3, name: 'Hypercraft', description: `Site de présentaion d'un serveur Minecraft`, image: 'img/Hypercraft.png', url: 'Hypercraft.html', play:'<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512" style="fill : #bbb"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/></svg>' },
    { id: 4, name: 'LigntsOn', description: 'Jeu Mobile de réflexion', image: 'img/LightsOn.jpg', url: 'LightsOn.html', play:'<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512" style="fill : #bbb"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/></svg>' },
    { id: 5, name: 'Jeu Jump 2D', description: 'Plateformer 2D sur le thème de Minecraft, développé sur Unity', image: 'img/Jump2D.png', url: 'Jump2D.html' },
    { id: 6, name: 'How ?!', description: `Jeu d'escape game 3D sur le thème de l'Egypte antique`, image: 'img/How.png', url: 'https://www.youtube.com/watch?v=Z_WZ0Orbqj8&ab_channel=WeCanStudio' , play:'<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512" style="fill : #bbb"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/></svg>' },
    { id: 7, name: 'Application de pétanque, tarrot, belote', description: 'Application permettant de constituer les équipes et le matchmaking réalisé pour un camping', image: 'img/Petanque.png', url: 'Petanque.html'},
    { id: 8, name: 'Bot de trading', description: `Bot permettant d'acheter et de vendre une cryptomonnaie à un moment propice du marché`, image: 'img/Trading.png', url: 'Trading.html'},
    { id: 9, name: 'Application de tri de fichier xml dans des sous dossiers', description: 'Application permettant de retrouver facilement un ID dans un dossier qui répertorie des fichiers par dates, destinée à un hôpital', image: 'img/sort.png', url: 'Sort.html'},
  ];

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
      image: 'img/roomBrook.jpeg'
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
    }
  ]



  const projectContainer = document.querySelector('.project-container');
  const roomContainer = document.querySelector('.room-container');

  projects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.innerHTML = `
      <img src="${project.image}" alt="${project.name}">
      <div class="project-info">
        <a>${project.name}</a>
        <p>${project.description}</p>
        ${project.play ? `<a href="${project.url}">${project.play}</a>` : ''}
      </div>
    `;
    projectContainer.appendChild(projectDiv);
  });
  

  rooms.forEach(room => {
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room');
    roomDiv.innerHTML = `
      <img src="${room.image}" alt="${room.name}">
      <div class="room-info">
        <h3>${room.name}</h3>
        <p>${room.description}</p>
      </div>
    `;
    roomContainer.appendChild(roomDiv);
  });


});

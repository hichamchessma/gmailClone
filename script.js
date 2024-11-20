document.addEventListener('DOMContentLoaded', () => {
    // Select the "Inbox" tab by default
 

       const inboxTab = document.querySelector('.menu-item:first-child'); // Update this selector as needed to match your "Inbox" item
    if (inboxTab) {
        inboxTab.classList.add('selected');
    }

    // Toggle mail star status
    const starIcons = document.querySelectorAll('.star-icon');
    starIcons.forEach(star => {
        star.addEventListener('click', () => {
            star.classList.toggle('active');
            star.textContent = star.classList.contains('active') ? 'star' : 'star_border';
        });
    });

    const mailListContainer = document.getElementById('mail-list-container');
    
    fetch('mail-list.html')
        .then(response => response.text())
        .then(data => {
            mailListContainer.innerHTML = data;

            // Handle mail selection
            const mailCheckboxes = document.querySelectorAll('.mail-checkbox');
            const selectAllCheckbox = document.getElementById('select-all-checkbox');
            
            selectAllCheckbox.addEventListener('change', () => {
                mailCheckboxes.forEach(checkbox => {
                    checkbox.checked = selectAllCheckbox.checked;
                    const mailItem = checkbox.closest('.mail-item');
                    if (selectAllCheckbox.checked) {
                        mailItem.classList.add('selected');
                    } else {
                        mailItem.classList.remove('selected');
                    }
                });
            });

            mailCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const mailItem = e.target.closest('.mail-item');
                    if (e.target.checked) {
                        mailItem.classList.add('selected');
                    } else {
                        mailItem.classList.remove('selected');
                    }
                });
            });

            // Use MutationObserver to observe changes
            const observer = new MutationObserver(() => {
                const mailItems = document.querySelectorAll('.mail-item');
                mailItems.forEach((mail, index) => {
                    // For demonstration, mark even-indexed mails as read
                    if (index % 2 === 0) {
                        mail.classList.add('read');
                    } else {
                        mail.classList.add('unread');
                    }
                });
            });

            observer.observe(mailListContainer, { childList: true, subtree: true });
        })
        .catch(error => {
            console.error('Erreur lors du chargement de la liste de mails:', error);
        });

    // Handle tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Toggle submenu visibility for "More/Less" section
    const moreMenuHeader = document.querySelector('.more-menu-header');
    const submenu = document.querySelector('.submenu');
    
    // Initial state setup
    submenu.style.display = 'none';
    moreMenuHeader.querySelector('a').textContent = 'More';
    moreMenuHeader.querySelector('.material-icons').textContent = 'expand_more';

    moreMenuHeader.addEventListener('click', () => {
        if (submenu.style.display === 'none' || submenu.style.display === '') {
            submenu.style.display = 'block';
            moreMenuHeader.querySelector('a').textContent = 'Less';
            moreMenuHeader.querySelector('.material-icons').textContent = 'expand_less';
        } else {
            submenu.style.display = 'none';
            moreMenuHeader.querySelector('a').textContent = 'More';
            moreMenuHeader.querySelector('.material-icons').textContent = 'expand_more';
        }
    });

    // Handle sidebar menu item selection
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'selected' class from all menu items
            menuItems.forEach(menu => menu.classList.remove('selected'));

            // Add 'selected' class to the clicked item
            item.classList.add('selected');
        });
    });
});

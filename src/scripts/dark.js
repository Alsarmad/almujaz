module.exports = function dark() {

    let dark = document.getElementById('dark')

    if (dark) {

        let icon_dark = document.getElementById('icon_dark');
        let mod = 'dark'

        dark.addEventListener('click', (e)=> {

            if (mod === 'dark') {
                icon_dark.srcset = "../public/icon/moon.png"
                mod = 'light'
            }
            else {
                icon_dark.srcset = "../public/icon/sun.png"
                mod = 'dark'
            }
        });
        
    }
    
}
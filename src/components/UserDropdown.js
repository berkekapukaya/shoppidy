import "../css/Navbar.css";


const UserDropdown = (props) => {

    const {onSignOut, onDashboard, position, containerRef, onProductsDashboard, onUsersDashboard} = props;

    const isAdmin = localStorage.getItem('isAdmin');

    return (
            <div ref={containerRef} style={{left: position.left + 70}} className="user-dropdown">
                {/* Show user dropdown when logged in */}

                {isAdmin === 'true' && <>
                    <span>Hesap Ayarları</span>
                    <button onClick={onDashboard}>Ürün Ekle</button>
                    <button onClick={onProductsDashboard}>Ürünler</button>
                    <button onClick={onUsersDashboard}>Kullanıcılar</button>
                </>}

                <button style={{textTransform: "capitalize"}} onClick={onSignOut}>çıkış yap</button>
            </div>
    )
}

export default UserDropdown;
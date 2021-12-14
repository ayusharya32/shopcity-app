function Loader() {
    return (
        <div className="loader-container">
            <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
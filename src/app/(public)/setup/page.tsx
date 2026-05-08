
export default function SetupPage(){
    // <div id="setup-screen" className="screen" style="display: none;">
    return (
        <div >
            <h1 id="setup_heading" className="primary">Let's set it up!</h1>
            <form id="meeting-form">
                <div className="form-group">
                    <h2 id="setup_form_head_1" className="secondary">About this meeting:</h2>

                    <label htmlFor="meeting-name"></label>
                    <input type="text" id="meeting-name" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="meeting-date"></label>
                    <input type="date" id="meeting-date" required/>
                </div>

                <div className="form-group">
                    <h2 id="setup_form_head_2" className="secondary">We need a participant count:</h2>

                    <div className="participant-input">
                        <label htmlFor="women-count"></label>
                        <input type="number" id="women-count" min="0" value="0"/>
                    </div>

                    <div className="participant-input">
                        <label htmlFor="nonbinary-count"></label>
                        <input type="number" id="nonbinary-count" min="0" value="0"/>
                    </div>

                    <div className="participant-input">
                        <label htmlFor="men-count"></label>
                        <input type="number" id="men-count" min="0" value="0"/>
                    </div>
                </div>

                <div className="form-group">
                    <h2 id="color_theme_heading" className="secondary">Choose color theme for gender buttons:</h2>


                    <div id="theme-preview" className="theme-preview">
                        <h3 className="preview-title"></h3>
                        <div className="preview-buttons">
                            <button type="button" className="preview-btn women-preview"></button>
                            <button type="button" className="preview-btn nonbinary-preview"></button>
                            <button type="button" className="preview-btn men-preview"></button>
                        </div>
                    </div>

                    <div id="color-theme-selector" className="color-theme-selector">

                    </div>
                </div>

                <button type="button" id="start-meeting">Start meeting</button>
            </form>
        </div>
    )
}
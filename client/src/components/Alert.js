const Alert = ({ err }) => {
    return(
        <div className="d-flex justify-content-end">
            <div className="alert alert-danger d-flex align-items-center text-center w-25" role="alert">
                    { err.message }
            </div>
        </div>
    );
}

export default Alert;
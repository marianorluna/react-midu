const RecargarPagina = () => {
    const recargar = () => {
        window.location.reload();
    };

    return <button onClick={recargar}>Actualizar (componente)</button>;
};

export default RecargarPagina;

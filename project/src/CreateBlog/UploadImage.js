function UploadImage(props) {
  const onChangeHandler = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      //localStorage.setItem('recent-image',reader.result)
      props.saveFiles(reader.result);
    });
    reader.readAsDataURL(file);
    //console.log(reader.result, reader.readAsDataURL(file), "in image");
    //read about this
  };
  return (
    <input
      required={props.required}
      type="file"
      id="file"
      accept="image/*"
      multiple
      onChange={onChangeHandler}
    />
  );
}

export default UploadImage;

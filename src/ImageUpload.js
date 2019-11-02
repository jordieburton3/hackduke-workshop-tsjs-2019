import React from 'react';
import { ConnectedImageCaptureButton } from './ImageCaptureButtons';
import { AppContext } from './AppContext';

export class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        image: null
      };
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
      this._resetImage = this._resetImage.bind(this);
    }

    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      
    }
  
    _resetImage() {
        this.setState({ file: '', imagePreviewUrl: '' });
    }

    _handleImageChange(e) {
      e.preventDefault();
      const { setImage } = this.props;
      let reader = new FileReader();
      let file = e.target.files[0];
      //console.log(setImage);
      reader.onloadend = () => {
        this.setState({ 
            file: file,
            imagePreviewUrl: reader.result
        });
        const image = document.getElementsByClassName("image-uploaded")[0];
        this.setState({
          image: image
        });
        setImage(image);
        //console.log(image);
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let { imagePreviewUrl } = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={ imagePreviewUrl } className="image-uploaded"/>);
      }
  
      return (
        <div>
          <form onSubmit={ this._handleSubmit }>
            <input type="file" onChange={ this._handleImageChange } />
          </form>
          <ConnectedImageCaptureButton image={this.state.image} resetImageState={this._resetImage}/>
          { $imagePreview }
        </div>
      )
    }
  }

export const ConnectedImageUpload = () => (
    <AppContext.Consumer>
        {context => (
            <ImageUpload setImage={context.actions.setImage}/>
        )}
    </AppContext.Consumer>
)
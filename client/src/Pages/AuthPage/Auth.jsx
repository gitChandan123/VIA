import AuthContainer from "../../components/Auth/AuthContainer";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Auth = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
  <div className="auth">
    <Particles id="particles-here" init={particlesInit}    options={{
        "fullScreen": {
            "enable": true,
            "zIndex": 1
        },
        "particles": {
            "number": {
                "value": 20,
                "density": {
                    "enable": false,
                    
                }
            },
           
            "shape": {
                "type": "circle",
                "stroke":{
                  "width": 6,
                  "color": "#a80cc0"
                },    
            },
            "move": {
                "enable": true,
                "speed": 5,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
       
      
      
    } } />

    <AuthContainer />
  </div>
  )
}

export default Auth
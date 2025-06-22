
import ConfigurationPanel from "./configuration-panel";
import QRCodeDisplay from "./qr-code-display";

const Form = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ConfigurationPanel />
        <QRCodeDisplay />
    </div>
  )
}

export default Form
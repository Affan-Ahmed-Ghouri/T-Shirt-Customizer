import CustomButton from './CustomButton';

const ImageAdjuster = ({ 
  logoPosition, 
  logoRotation, 
  logoScale,
  fullPosition,
  fullRotation,
  fullScale,
  activeType,
  onUpdateLogo,
  onUpdateFull
}) => {
  const activePosition = activeType === 'logo' ? logoPosition : fullPosition;
  const activeRotation = activeType === 'logo' ? logoRotation : fullRotation;
  const activeScale = activeType === 'logo' ? logoScale : fullScale;

  const handlePositionChange = (index, value) => {
    const newPos = [...activePosition];
    newPos[index] = parseFloat(value);
    if (activeType === 'logo') {
      onUpdateLogo({ logoPosition: newPos });
    } else {
      onUpdateFull({ fullPosition: newPos });
    }
  };

  const handleRotationChange = (index, value) => {
    const newRot = [...activeRotation];
    newRot[index] = parseFloat(value);
    if (activeType === 'logo') {
      onUpdateLogo({ logoRotation: newRot });
    } else {
      onUpdateFull({ fullRotation: newRot });
    }
  };

  const handleScaleChange = (value) => {
    const newScale = parseFloat(value);
    if (activeType === 'logo') {
      onUpdateLogo({ logoScale: newScale });
    } else {
      onUpdateFull({ fullScale: newScale });
    }
  };

  return (
    <div className="image-adjuster-container">
      <h3 className="text-sm font-bold mb-3">
        Adjust {activeType === 'logo' ? 'Logo' : 'Full'} Image
      </h3>

      <div className="space-y-3">
        <div className="adjustment-group">
          <label className="text-xs text-gray-600 block mb-1">Position (X, Y, Z)</label>
          <div className="flex gap-2">
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={activePosition[0]}
              onChange={(e) => handlePositionChange(0, e.target.value)}
              className="flex-1"
            />
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={activePosition[1]}
              onChange={(e) => handlePositionChange(1, e.target.value)}
              className="flex-1"
            />
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={activePosition[2]}
              onChange={(e) => handlePositionChange(2, e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            X: {activePosition[0].toFixed(2)}, Y: {activePosition[1].toFixed(2)}, Z: {activePosition[2].toFixed(2)}
          </div>
        </div>

        <div className="adjustment-group">
          <label className="text-xs text-gray-600 block mb-1">Rotation (X, Y, Z)</label>
          <div className="flex gap-2">
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step="0.1"
              value={activeRotation[0]}
              onChange={(e) => handleRotationChange(0, e.target.value)}
              className="flex-1"
            />
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step="0.1"
              value={activeRotation[1]}
              onChange={(e) => handleRotationChange(1, e.target.value)}
              className="flex-1"
            />
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step="0.1"
              value={activeRotation[2]}
              onChange={(e) => handleRotationChange(2, e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            X: {(activeRotation[0] * 180 / Math.PI).toFixed(0)}°, Y: {(activeRotation[1] * 180 / Math.PI).toFixed(0)}°, Z: {(activeRotation[2] * 180 / Math.PI).toFixed(0)}°
          </div>
        </div>

        <div className="adjustment-group">
          <label className="text-xs text-gray-600 block mb-1">Scale</label>
          <input
            type="range"
            min="0.05"
            max="2"
            step="0.01"
            value={activeScale}
            onChange={(e) => handleScaleChange(e.target.value)}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {activeScale.toFixed(2)}x
          </div>
        </div>

        <CustomButton
          type="outline"
          title="Reset"
          handleClick={() => {
            if (activeType === 'logo') {
              onUpdateLogo({
                logoPosition: [0, 0.04, 0.15],
                logoRotation: [0, 0, 0],
                logoScale: 0.15
              });
            } else {
              onUpdateFull({
                fullPosition: [0, 0, 0],
                fullRotation: [0, 0, 0],
                fullScale: 1
              });
            }
          }}
          customStyles="text-xs w-full"
        />
      </div>
    </div>
  );
};

export default ImageAdjuster;
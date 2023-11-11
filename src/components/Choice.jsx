// eslint-disable-next-line react/prop-types
export const Choice = ({percentage = 0, name = 'choice'}) => {
  return (
    <div className="choice row align-items-center mb-2">
      <div className="col-8">
        <div className="progress" style={{ height: '8px' }} role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="col-lg-1 text-wrap">
        <div className="choice-desc" style={{ fontSize: '14px' }}>
          <div className="m-0 choice-name">{name}</div>
          <div className="m-0 choice-percentage">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

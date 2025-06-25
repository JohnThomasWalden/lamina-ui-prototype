// Top panel for Future Forecasts
function Top() {
  return (
    <section className="bg-slate-800 p-4 rounded-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Future Forecasts</h2>
      <div className="bg-slate-700 rounded-lg p-4">
        <p className="text-slate-300">10/30/60/90-day outlook table will go here</p>
      </div>
    </section>
  );
}

// Bottom panel for Past Performance
function Bottom() {
  return (
    <section className="bg-slate-800 p-4 rounded-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Past Performance</h2>
      <div className="bg-slate-700 rounded-lg p-4">
        <p className="text-slate-300">Data visualizing historical results will go here</p>
      </div>
    </section>
  );
}

// Main FuturePanel component with sub-components
const FuturePanel = {
  Top,
  Bottom,
};

export default FuturePanel; 
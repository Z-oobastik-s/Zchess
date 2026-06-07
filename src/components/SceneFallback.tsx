import bgHome from '../../assets/Image/background_home_page.png';

export function SceneFallback() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgHome})` }}
    />
  );
}

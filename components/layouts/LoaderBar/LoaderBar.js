import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setLoadingRouter } from 'actions';
import { useRouter } from 'next/router';

const LoaderBar = (props) => {
  const { t, dispatch, isLoadingRouter } = props;
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  //Fake loader
  useEffect(() => {
    let interval;
    if (!isLoadingRouter) {
      setProgress(0);
    } else {
      let step = 0.05;
      let currentProgress = progress;
      interval = setInterval(function () {
        currentProgress += step;
        let newProgress =
          Math.round(
            (Math.atan(currentProgress) / (Math.PI / 2)) * 100 * 1000
          ) / 1000;
        setProgress(newProgress);
        if (newProgress >= 100) {
          clearInterval(interval);
        } else if (newProgress >= 50) {
          step = 0.05;
        }
      }, 250);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isLoadingRouter]);

  //Check if the route is changing
  useEffect(() => {
    const handleRouteChange = (url) => {
      dispatch(setLoadingRouter(true));
    };
    const handleRouteComplete = (url) => {
      dispatch(setLoadingRouter(false));
    };
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, []);

  return (
    <ProgressBar
      aria-label="progressbar"
      now={progress}
      className={`top-loader-bar ${
        progress > 0 ? 'top-loader-bar--show' : 'top-loader-bar--hide'
      } `}
    />
  );
};

export const mapStateToProps = (state) => ({
  isLoadingRouter: state.connectionReducer.isLoadingRouter,
});

export default connect(mapStateToProps)(LoaderBar);

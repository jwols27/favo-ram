import React from 'react';
import '../styles/carousel.styles.scss';

export const CCarousel = () => {
    const items: React.ReactNode[] = [1, 2, 3, 4, 5];

    const slideRefs = React.useRef<
        Array<React.RefObject<HTMLDivElement> | null>
    >([]);

    const [currentSlide, setCurrentSlide] = React.useState<number>(0);

    const onClickRight = () => {
        setCurrentSlide(
            currentSlide === items.length - 1 ? 0 : currentSlide + 1,
        );
    };

    const onClickLeft = () => {
        setCurrentSlide(
            currentSlide === 0 ? items.length - 1 : currentSlide - 1,
        );
    };

    React.useEffect(() => {
        slideRefs.current.forEach((slide) => {
            if (!slide?.current) return;
            slide.current.style.transform = `translateX(${
                -100 * currentSlide
            }%)`;
            console.log(slide.current.style.transform);
        });
    }, [currentSlide]);

    const RenderSlides = () => {
        const slides: React.ReactNode[] = [];

        for (let i = 0; i < items.length; i++) {
            const slide = React.useRef<HTMLDivElement | null>(null);
            slideRefs.current[i] = slide;

            slides.push(
                <div
                    key={i}
                    ref={slide}
                    className={'carousel-slide bg-color-1-light'}
                    style={{ left: `${100 * i}%` }}
                >
                    {items[i]}
                </div>,
            );
        }

        return slides;
    };

    return (
        <div className={'carousel shadow-box bg-color-1'}>
            <div className={'carousel-arrow-l'} onClick={onClickLeft} />
            <div className={'carousel-container'}>{RenderSlides()}</div>
            <div className={'carousel-arrow-r'} onClick={onClickRight} />
        </div>
    );
};

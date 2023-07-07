import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/carousel.styles.scss';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface ICarouselProps {
    children: React.ReactNode;
    itemsOnScreen?: number;
    slidesPerSwipe?: number;
    slideHeight?: number;
    gap?: number;
}

export const CCarousel = ({
    itemsOnScreen = 1,
    slidesPerSwipe = 1,
    slideHeight,
    gap = 1,
    children,
    ...props
}: ICarouselProps & React.HTMLAttributes<HTMLDivElement>) => {
    const percentage = 100 / itemsOnScreen;
    const items = React.Children.toArray(children);
    const formula = items.length - itemsOnScreen - (slidesPerSwipe - 1);

    const [currentSlide, setCurrentSlide] = React.useState<number>(0);

    const slideRefs = React.useMemo(
        () =>
            Array(items.length)
                .fill(null)
                .map(() => React.createRef<HTMLDivElement>()),
        [items.length],
    );

    React.useEffect(() => {
        slideRefs.forEach((slide) => {
            if (!slide?.current) return;
            slide.current.style.transform = `translateX(${
                -100 * currentSlide * slidesPerSwipe
            }%)`;
        });
    }, [currentSlide]);

    const onClickRight = (): void =>
        setCurrentSlide(currentSlide === formula ? 0 : currentSlide + 1);
    const onClickLeft = (): void =>
        setCurrentSlide(currentSlide < 1 ? formula : currentSlide - 1);

    const RenderSlides = (): React.ReactNode => {
        return items.map((item, i) => (
            <div
                key={i}
                ref={slideRefs[i]}
                className={`carousel-slide gap-${gap}`}
                draggable={false}
                style={{
                    left: `${percentage * i}%`,
                    width: itemsOnScreen > 1 ? `${percentage}%` : undefined,
                    height: slideHeight ? `${slideHeight}%` : undefined,
                }}
            >
                {item}
            </div>
        ));
    };

    return (
        <div {...props} className={`carousel ${props.className ?? ''}`}>
            {items.length > itemsOnScreen && (
                <div className={'carousel-arrow-l'} onClick={onClickLeft}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            )}
            <div className={'carousel-container'}>{RenderSlides()}</div>
            {items.length > itemsOnScreen && (
                <div className={'carousel-arrow-r'} onClick={onClickRight}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            )}
        </div>
    );
};

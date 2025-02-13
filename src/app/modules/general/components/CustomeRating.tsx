import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const CustomRating = ({ onChange }: any) => {
    const [rating, setRating] = useState<number | null>(null);
    const [hover, setHover] = useState<number | null>(null);

    useEffect(() => {
        onChange(rating)
    }, [rating]);

    return (
        <div className='d-flex rtl align-items-center'>
            <RatingWrapper className='m-0'>
                {[...Array(5)].map((n, i) => {
                    const ratingValue = i + 1;
                    return (
                        <span key={i}>
                            <i
                                className={`fs-1 fas fa-star ${ratingValue <= (hover || rating || 0) ? 'text-gold shadow-gold' : 'text-gray'
                                    }`}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setRating(ratingValue)}
                            />
                        </span>
                    );
                })}
            </RatingWrapper>
            <div className={`w-100px ms-5 border-0 bg-gray text-center p-1 rounded-3 p-3 w-150px fs-6 ${!!rating === false ? '' : (!!rating && rating < 3 ? 'rate-neg' : 'rate-pos')}`}>
                {!!rating === false && <>انتخاب نشده</>}
                {rating === 1 && <>خیلی بد</>}
                {rating === 2 && <>بد</>}
                {rating === 3 && <>خوب</>}
                {rating === 4 && <>خیلی خوب</>}
                {rating === 5 && <>عالی</>}
            </div>
        </div>
    );
};

export const RatingWrapper = styled.aside`
  width: max-content;
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    & :nth-child(-n + 4) {
      margin-right: 0.2rem;
      width: max-content;
      text-align: center;
    }
  }

  .radio_input {
    display: none;
  }
`;

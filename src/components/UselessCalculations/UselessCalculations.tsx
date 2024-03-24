import React, { useEffect, useMemo, useState } from 'react';

export const UselessCalculations = () => {
  const iterations = 50;
  const multiplier = 1000000000;



  const [isClient, setIsClient] = useState(false)

  const primes = useMemo(() => {
    if (!isClient) {
      return [];
    }
    function calculatePrimes(iterations: number, multiplier: number) {
      const primes = [];
      for (let i = 0; i < iterations; i++) {
        const candidate = i * (multiplier * Math.random());
        let isPrime = true;
        for (let c = 2; c <= Math.sqrt(candidate); ++c) {
          if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          primes.push(candidate);
        }
      }
      return primes;
    }
    return calculatePrimes(iterations, multiplier);
  }, [isClient])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div>
      <p>Calculating random numbers to simulate heavy app</p>
      <div>
        {primes.join(' ')}
      </div>
    </div>
  )
}
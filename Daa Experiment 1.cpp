// recursive function => T(n) = 3 T(n/2) + n*logn + n
// time complexity = O (n^log3)   here base is 2 and angle is 3
// Case of master theorm is first one where a > b^k

#include <bits/stdc++.h>
#include <chrono>

using namespace std::chrono;
using namespace std;

long long int operations = 0;

int complexRec(int n) {

    int depth;
    if (n <= 2) {
       
       return (0);
    }


   int p = n;
   while (p > 0) {
       vector<int> temp(n);
       for (int i = 0; i < n; i++) {
           temp[i] = i ^ p;
           operations++;
       }
       p >>= 1;
       operations++;
   }


   vector<int> small(n);
   for (int i = 0; i < n; i++) {
       small[i] = i * i;
       operations++;
   }


   if (n % 3 == 0) {
       reverse(small.begin(), small.end());
       operations++;
   } else {
       reverse(small.begin(), small.end());
       operations++;
   }

    
    complexRec(n / 2);
    complexRec(n / 2);
    depth = complexRec(n / 2);
    return (++depth);
}


int main() {
    // Write C++ code here
    auto start = high_resolution_clock::now();
    int depth = complexRec(8);
    cout << "Depth = " << depth << endl;
    cout << "Operations = " << operations << endl;
    
    
     auto end = high_resolution_clock::now();
     auto duration = duration_cast<milliseconds>(end - start);
       
     cout << duration.count() << "ms";

    return 0;
}
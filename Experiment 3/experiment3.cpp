#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;

    vector<char> arr(N);
    for (int i = 0; i < N; i++) {
        cin >> arr[i];
    }

    int balance = 0;
    int maxLen = 0;
    unordered_map<int, int> firstIndex;
    firstIndex[0] = -1;

    for (int i = 0; i < N; i++) {
        if (arr[i] == 'P') balance += 1;
        else balance -= 1;

        if (firstIndex.find(balance) != firstIndex.end()) {
            int length = i - firstIndex[balance];
            maxLen = max(maxLen, length);
        } else {
            firstIndex[balance] = i;
        }
    }

    cout << maxLen << endl;
    return 0;
}